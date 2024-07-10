document.addEventListener('DOMContentLoaded', () => {
  const consoleOutput = document.getElementById('console-output');
  const content = document.getElementById('content');
  const commands = [
    { immediate: 'axisdadev.com@125.123.32.23:~$ ', type: 'python portfolio.py\n' },
    ' * Serving Flask app "web portfolio"\n',
    ' * Running on http://127.0.0.1:3000/ (Press CTRL+C to quit)\n',
    ' * AxiForward: Port Forwarding to the interwebz from \n* https://127.0.0.1:3000 <---> https://axisdadev.com\n',
    '.........\n\n',
    'Done!'
  ];

  let commandIndex = 0;
  let cursor;

  function createCursor() {
    cursor = document.createElement('span');
    cursor.className = 'cursor';
    consoleOutput.appendChild(cursor);
  }

  function removeCursor() {
    if (cursor) {
      cursor.remove();
      cursor = null;
    }
  }

  function typeEffectCharacterByCharacter(element, text, callback) {
    let i = 0;
    const interval = setInterval(() => {
      const char = text.charAt(i);
      element.innerHTML += char === "\n" ? "<br/>" : char;
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        removeCursor();
        if (callback) callback();
      }
    }, 85); // typing speed for characters using existing setting 85 to simulate human typing
  }

  function typeEffectLineByLine(element, text, callback) {
    element.innerHTML += text.replace(/\n/g, '<br/>');
    if (callback) callback();
  }

  function typeNextCommand() {
    if (commandIndex < commands.length) {
      if (commandIndex === 0) {
        const { immediate, type } = commands[commandIndex];
        consoleOutput.innerHTML += immediate;
        createCursor();
        typeEffectCharacterByCharacter(consoleOutput, type, () => {
          commandIndex++;
          setTimeout(typeNextCommand, 500); // delay between character to line by line typing
        });
      } else {
        typeEffectLineByLine(consoleOutput, commands[commandIndex], () => {
          if (commands[commandIndex] === '.........\n\n') {
            setTimeout(() => {
              commandIndex++;
              typeNextCommand();
            }, 3000); // 3 second delay after totally cool dots
          } else {
            commandIndex++;
            setTimeout(typeNextCommand, 1000); 
          }
        });
      }
    } else {
      setTimeout(() => {
        document.getElementById('console').style.display = 'none';
        content.classList.remove('hidden');
      }, 100);
    }
  }

  typeNextCommand();
});

function openPage(url) {
  window.open(url, '_blank');
}
