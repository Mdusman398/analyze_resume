// --- Global Elements ---
const analysisForm = document.getElementById('analysisForm');
const messageElement = document.getElementById('message');
const loadingIndicator = document.getElementById('loadingIndicator');
const analysisResultsSection = document.getElementById('analysisResults');

const matchScoreElement = document.getElementById('matchScore');
const atsScoreElement = document.getElementById('atsScore');
const suggestionsTextElement = document.getElementById('suggestionsText');
const analyzeButton = document.getElementById('analyze-btn');

// Input/Output Elements
const jobTitleInput = document.getElementById('jobTitle');
const resumeTextInput = document.getElementById('resumeText');
const jobDescriptionInput = document.getElementById('jobDescription');
const analysisHistoryList = document.getElementById('analysisHistoryList');

//  Helper Functions ---

function getAuthToken() {
    const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
    return tokenCookie ? tokenCookie.split('=')[1].trim() : null;
}

function displayAlert(text, type = 'error') {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
}

function clearState() {
    messageElement.textContent = '';
    analysisResultsSection.style.display = 'none';
    loadingIndicator.style.display = 'none';
    analyzeButton.disabled = false;
    analyzeButton.textContent = 'Analyze CV Match';
}

function toggleLoading(isLoading) {
    analyzeButton.disabled = isLoading;
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
    analyzeButton.textContent = isLoading ? 'Analyzing...' : 'Analyze CV Match';
}

// --- CORE CRUD Functions (Client-Side) ---

// DELETE FUNCTION
const deleteAnalysisEntry = async (id) => {
    if (!confirm('Are you sure you want to delete this analysis entry?')) {
        return;
    }

    try {
        const response = await fetch(`/api/resume/history/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
            displayAlert(`Entry deleted successfully: ${result.id}`, 'success');
            fetchAnalysisHistory();
        } else if (response.status === 401) {
             displayAlert('Unauthorized. Please log in again.', 'error');
        } else {
            displayAlert(result.message || 'Deletion failed. Check server logs.', 'error');
        }

    } catch (error) {
        console.error('Network or Deletion Error:', error);
        displayAlert('Network error during deletion.', 'error');
    }
}

// UPDATE/EDIT FUNCTION
const updateAnalysisTitle = async (id, newTitle) => {
    try {
        const response = await fetch(`/api/resume/history/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ jobTitle: newTitle }) 
        });

        const result = await response.json();

        if (response.ok) {
            displayAlert(`Job Title updated to: ${newTitle}`, 'success');
            fetchAnalysisHistory();
        } else if (response.status === 401) {
             displayAlert('Unauthorized. Please log in again.', 'error');
        } else {
            displayAlert(result.message || 'Update failed. Check server logs.', 'error');
        }

    } catch (error) {
        console.error('Network or Update Error:', error);
        displayAlert('Network error during update.', 'error');
    }
}

// --- Function to Display History (FIXED with Delete & Edit buttons) ---
const displayHistory = (history) => {
    analysisHistoryList.innerHTML = ''; 

    if (history.length === 0) {
        analysisHistoryList.innerHTML = '<li class="list-group-item list-group-item-info">No analysis history found. Start your first analysis!</li>';
        return;
    }

    history.forEach(item => {
        const listItem = document.createElement('li');
        const date = new Date(item.createdAt).toLocaleString();
        
        const ats = item.atsScore || 'N/A';
        const match = item.customScore || 'N/A';
        const id = item._id; 

        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <strong class="me-3 job-title-display" id="title-${id}">${item.jobTitle}</strong> 
                <small class="text-muted">(${date})</small>
            </div>
            <div class="d-flex align-items-center">
                <span class="badge bg-success me-2">Match: ${match}%</span>
                <span class="badge bg-primary me-3">ATS: ${ats}%</span>
                
                <button 
                    class="btn btn-sm btn-warning edit-btn" 
                    data-id="${id}"
                    data-title="${item.jobTitle}"
                    style="margin-left: 5px;"
                >
                    Edit
                </button>

                <button 
                    class="btn btn-sm btn-danger delete-btn" 
                    data-id="${id}"
                    style="margin-left: 5px;"
                >
                    Delete
                </button>
                
                <button 
                    class="btn btn-sm btn-info view-btn" 
                    data-id="${id}"
                    style="margin-left: 5px;"
                >
                    View
                </button>
            </div>
        `;
        analysisHistoryList.appendChild(listItem);
    });

    // --- Event Delegation for Buttons ---

    // 1. DELETE BUTTON LISTENER
    analysisHistoryList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            deleteAnalysisEntry(id);
        });
    });
    
    // 2. EDIT BUTTON LISTENER
    analysisHistoryList.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const currentTitle = e.currentTarget.getAttribute('data-title');
            
            const newTitle = prompt(`Edit Job Title for Analysis ID: ${id}`, currentTitle);
            
            if (newTitle && newTitle.trim() !== '' && newTitle.trim() !== currentTitle) {
                updateAnalysisTitle(id, newTitle.trim());
            } else if (newTitle !== null) {
                displayAlert('Job Title was not changed.', 'info');
            }
        });
    });

    // 3. VIEW BUTTON LISTENER (getSingleAnalysis)
    analysisHistoryList.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            e.currentTarget.disabled = true; 

            try {
                const response = await fetch(`/api/resume/history/${id}`, { method: 'GET', credentials: 'include' });
                const data = await response.json();
                
                if (response.ok) {
                    displayAlert(`Viewing analysis for: ${data.jobTitle}`, 'info');
                    matchScoreElement.textContent = `Matching Score: ${data.customScore}%`;
                    atsScoreElement.textContent = `ATS Compliance Score: ${data.atsScore}%`;
                    
                    // --- Naya Aur Detailed AI Analysis Output Area ---
                    const pointsHtml = data.suggestions.map(point => `<li>${point}</li>`).join('');
                    suggestionsTextElement.innerHTML = `
                        <div class="ai-analysis-output-container">
                            <p><strong>Job Match Summary:</strong> ${data.jobMatchDetails}</p>
                            <hr>
                            <h4 class="text-primary">Actionable Improvement Points:</h4>
                            <ul class="list-unstyled">${pointsHtml}</ul>
                            
                            <hr>
                            <h4 class="text-secondary">Reference Data:</h4>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <h5>Job Description (Full Text):</h5>
                                    <pre class="bg-light p-3 border rounded text-dark">${data.jobDescription}</pre>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <h5>Resume Text (Full Text):</h5>
                                    <pre class="bg-light p-3 border rounded text-dark">${data.resumeText}</pre>
                                </div>
                            </div>
                        </div>
                    `;
                    // --- End of Detailed Output Area ---
                    
                    analysisResultsSection.style.display = 'block';

                    jobTitleInput.value = data.jobTitle;
                    jobDescriptionInput.value = data.jobDescription;
                    resumeTextInput.value = data.resumeText;

                } else {
                    displayAlert(data.message || 'Could not fetch single analysis.', 'error');
                }
            } catch (err) {
                console.error("View Error:", err);
                displayAlert('Network error while fetching single analysis.', 'error');
            } finally {
                e.currentTarget.disabled = false;
            }
        });
    });
};

// --- Naya Function: Analysis History Laana ---
const fetchAnalysisHistory = async () => {
    try {
        const response = await fetch('/api/resume/history', {
            method: 'GET',
            credentials: 'include', 
        });
        
        if (response.status === 401) {
             analysisHistoryList.innerHTML = '<li class="list-group-item text-danger">Please log in to view history.</li>';
             return; 
        }

        const history = await response.json();

        if (!response.ok) {
            throw new Error(history.message || 'Failed to fetch history');
        }

        displayHistory(history); 

    } catch (error) {
        console.error('Error fetching history:', error);
        analysisHistoryList.innerHTML = `<li class="list-group-item text-danger">Error loading history: ${error.message}</li>`;
    }
};

// --- Function to Handle Analysis Submission (FINAL FIX APPLIED) ---
if (analysisForm) {
    analysisForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearState(); 
        
        const jobTitle = jobTitleInput.value.trim();
        const jobDescription = jobDescriptionInput.value.trim();
        const resumeText = resumeTextInput.value.trim();

        if (!jobTitle || !jobDescription || !resumeText) {
            return displayAlert('All fields (Job Title, JD, and Resume Text) are required.', 'error');
        }

        toggleLoading(true); 
        
        try {
            const response = await fetch('/api/resume/analyze', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ jobTitle, jobDescription, resumeText }) 
            });

            const result = await response.json();
            
            if (response.status === 401) {
                displayAlert('Please log in to perform analysis.', 'error');
                return;
            }

            if (response.ok) {
                if (typeof result.customScore === 'undefined') { 
                    displayAlert(result.message || 'Analysis data is incomplete. Server did not return score.', 'error');
                    console.error('Missing score data in response:', result);
                    return;
                }
                
                displayAlert('Analysis successful! Results are displayed below.', 'success');
                
                matchScoreElement.textContent = `Matching Score: ${result.customScore}%`;
                atsScoreElement.textContent = `ATS Compliance Score: ${result.atsScore}%`;
                
                // --- Naya Aur Detailed AI Analysis Output Area ---
                const pointsHtml = result.suggestions.map(point => `<li>${point}</li>`).join('');
                suggestionsTextElement.innerHTML = `
                    <div class="ai-analysis-output-container">
                        <p><strong>Job Match Summary:</strong> ${result.jobMatchDetails}</p>
                        <hr>
                        <h4 class="text-primary">Actionable Improvement Points:</h4>
                        <ul class="list-unstyled">${pointsHtml}</ul>
                    </div>
                `;
                // --- End of Detailed Output Area ---

                analysisResultsSection.style.display = 'block';
                
                fetchAnalysisHistory(); 

            } else {
                displayAlert(result.message || 'Analysis failed. Server error occurred.', 'error');
                console.error('API Error:', result);
            }

        } catch (error) {
            console.error('Network or Parsing Error:', error);
            displayAlert('Network error or AI response was invalid. Please check the Console.', 'error');
        } finally {
            toggleLoading(false); 
        }
    });
}

// Page load hone par history load karna
document.addEventListener('DOMContentLoaded', () => {
    fetchAnalysisHistory();
});