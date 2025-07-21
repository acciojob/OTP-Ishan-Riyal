//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".code");

  inputs.forEach((input, idx) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;

      // Allow only digits, clear if not digit
      if (!/^\d$/.test(value)) {
        e.target.value = "";
        return;
      }

      // Move focus to next input if not last
      if (idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        e.preventDefault();

        if (input.value !== "") {
          // If current input has a value, clear it
          input.value = "";
        } else if (idx > 0) {
          // Move focus to previous input and clear it
          inputs[idx - 1].focus();
          inputs[idx - 1].value = "";
        }
      } else if (e.key >= "0" && e.key <= "9") {
        // Let input event handle digit input
      } else if (e.key === "ArrowLeft" && idx > 0) {
        inputs[idx - 1].focus();
        e.preventDefault();
      } else if (e.key === "ArrowRight" && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
        e.preventDefault();
      } else if (e.key !== "Tab") {
        // Prevent non-digit keys except Tab, arrows, Backspace
        e.preventDefault();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();

      const pasteData = e.clipboardData.getData("text").trim();
      if (!/^\d+$/.test(pasteData)) return;

      // Paste digits starting from current input
      let currentIdx = idx;
      for (const char of pasteData) {
        if (currentIdx >= inputs.length) break;
        inputs[currentIdx].value = char;
        currentIdx++;
      }
      // Focus the next empty input or last one
      if (currentIdx < inputs.length) {
        inputs[currentIdx].focus();
      } else {
        inputs[inputs.length - 1].focus();
      }
    });
  });

  // Autofocus first input on page load
  if (inputs.length > 0) {
    inputs[0].focus();
  }
});
