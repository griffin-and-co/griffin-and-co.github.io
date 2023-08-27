document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('input-form');
    const outputDiv = document.getElementById('output');

    // Function to update slider value display
    function updateSliderValue(sliderId, outputId) {
        const slider = document.getElementById(sliderId);
        const output = document.getElementById(outputId);
        output.textContent = slider.value;
    }

    // Update slider values on load and when slider is changed
    const sliders = [
        { sliderId: 'rave_yards', outputId: 'rave_yards_value' },
        { sliderId: 'rave_targets', outputId: 'rave_targets_value' },
	{ sliderId: 'rave_deep_targets', outputId: 'rave_deep_targets_value' },
        { sliderId: 'rave_first_downs', outputId: 'rave_first_downs_value' },
        { sliderId: 'rave_offense_pct', outputId: 'rave_offense_pct_value' },
        { sliderId: 'favored_by', outputId: 'favored_by_value' },
        { sliderId: 'total_line', outputId: 'total_line_value' }
    ];

    sliders.forEach(slider => {
        const sliderElement = document.getElementById(slider.sliderId);
        const outputElement = document.getElementById(slider.outputId);

        sliderElement.addEventListener('input', () => {
            updateSliderValue(slider.sliderId, slider.outputId);
        });

        updateSliderValue(slider.sliderId, slider.outputId);
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const data = {
            rave_yards: parseFloat(document.getElementById('rave_yards').value),
            rave_targets: parseFloat(document.getElementById('rave_targets').value),
            rave_deep_targets: parseFloat(document.getElementById('rave_deep_targets').value),
            total_line: parseFloat(document.getElementById('total_line').value),
            favored_by: parseFloat(document.getElementById('favored_by').value),
            rave_offense_pct: parseFloat(document.getElementById('rave_offense_pct').value),
            rave_first_downs: parseFloat(document.getElementById('rave_first_downs').value)
        };

        if (Object.values(data).some(isNaN)) {
            outputDiv.textContent = 'Please enter valid numbers.';
            return;
        }

        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        outputDiv.textContent = `Projected Output: ${result.output.toFixed(2)}`;
    });
});
