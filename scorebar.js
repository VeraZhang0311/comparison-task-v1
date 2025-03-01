document.addEventListener("DOMContentLoaded", function () {
 
    // Function to create and append the score bar if it's not in the DOM
    function createScoreBar() {
        if (!document.getElementById("score-bar-container")) {
            let scoreBarContainer = document.createElement("div");
            scoreBarContainer.id = "score-bar-container";

            let scoreBar = document.createElement("div");
            scoreBar.id = "score-bar";

            scoreBarContainer.appendChild(scoreBar);
            document.body.appendChild(scoreBarContainer);
        }
    }

    // Function to update the score bar width dynamically
    function updateScoreBar() {
        if (total_trials > 0) {
            let accuracy = (total_correct / total_trials) * 100; // Convert to percentage
            document.getElementById("score-bar").style.width = accuracy + "%";
        }else {
            document.getElementById("score-bar").style.width = "0%"; // Reset the bar when no trials have been conducted
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
