document.addEventListener("DOMContentLoaded", function () {

    // Function to create and append the score bar with text if it's not in the DOM
    function createScoreBar() {
        if (!document.getElementById("score-bar-container")) {
            let scoreBarContainer = document.createElement("div");
            scoreBarContainer.id = "score-bar-container";

            let scoreBar = document.createElement("div");
            scoreBar.id = "score-bar";

            let scoreText = document.createElement("div");
            scoreText.id = "score-text";
            scoreText.innerText = "Accuracy: 0%"; // Default text

            scoreBarContainer.appendChild(scoreBar);
            scoreBarContainer.appendChild(scoreText);
            document.body.appendChild(scoreBarContainer);
        }
    }

    function updateScoreBar() {
        let scoreBar = document.getElementById("score-bar");
        let scoreText = document.getElementById("score-text");
    
        if (total_trials > 0) {
            let accuracy = Math.round((total_correct / total_trials) * 100); // Round to integer
            scoreBar.style.width = accuracy + "%";
            scoreText.innerText = `Accuracy: ${accuracy}%`;
    
            // Change color based on accuracy threshold
            if (accuracy < 85) {
                scoreBar.style.backgroundColor = "red";
            } else {
                scoreBar.style.backgroundColor = "green";
            }
        } else {
            scoreBar.style.width = "0%"; // Reset the bar when no trials have been conducted
            scoreText.innerText = "Accuracy: 0%";
            scoreBar.style.backgroundColor = "green"; // Default color when no trials
        }
    }
    
    function resetScoreBar() {
        total_correct = 0;
        total_trials = 0;
        experimentStarted = false;
        updateScoreBar(); // Ensure the bar resets visually
    }

    // Attach function to window object to ensure global access
    window.updateScoreBar = updateScoreBar;
    window.resetScoreBar = resetScoreBar;

    // Hook into jsPsych trial logic
    document.addEventListener("jspsych-run", function () {
        createScoreBar(); // Ensure score bar exists when the experiment starts
    });

    // Ensure score bar is created after a short delay if necessary
    setTimeout(createScoreBar, 1000);
});