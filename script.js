document.addEventListener('DOMContentLoaded', () => {
  const consoleOutput = document.getElementById('console-output');
  const content = document.getElementById('content');
  const commands = [
    'axisdadev.com@125.123.32.23:~$ python portfolio.py\n',
    ' * Serving Flask app "portfolio"\n',
    ' * Running on http://127.0.0.1:3000/ (Press CTRL+C to quit)\n',
    ' * Port Forwarding to the interwebz...\n',
    ' * Port Forwarding from https://127.0.0.1:3000 <---> https://axisdadev.com\n\n\n\n',
    'Alright give us one second while we get the interwebz up and running................................................... \n\n',
    'Done!'
  ];

  let commandIndex = 0;

  function typeEffect(element, text, callback) {
    let i = 0;
    const interval = setInterval(() => {
      const char = text.charAt(i);
      element.innerHTML += char === "\n" ? "<br/>" : char;
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 15);
  }

  function typeNextCommand() {
    if (commandIndex < commands.length) {
      typeEffect(consoleOutput, commands[commandIndex], typeNextCommand);
      commandIndex++;
    } else {
      setTimeout(() => {
        document.getElementById('console').style.display = 'none';
        content.classList.remove('hidden');
      }, 750);
    }
  }

  typeNextCommand();
});


function openPage(url) {
  window.open(url, '_blank');
}