const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

let bgImage = document.getElementById('game-bg')

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text;
    bgImage.style.backgroundImage = textNode.background;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        background: "url('assets/images/cabin1.jpg')",
        text: 'You wake up in a strange cabin, you look around and see nobody else is around how did you get here you cannot remember. On a table in the corner of the cabin there is a strange goo substance inside of a jar what will you do with it?',
        options: [
            {
                text: 'Take the goo',
                setState: { blueGoo: true},
                nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        background: "url('assets/images/forest2.jpg')",
        text: 'You venture forth in search of answers. Upon leaving the cabin you follow a small dirt trail through a spooky looking forest you continue walking as fast as your legs will carry you. Once out of the forest you come across a small tent with an oddly looking merchant inside. "Tell me weary traveller have you any goods to trade?"',
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Sell the goo',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, gold: true },
                nextText: 3
            },
            {
              text: 'Ignore the merchant',
              nextText: 3
            }
        ]
    },
    {
        id: 3,
        background: "url('assets/images/crossroads3.jpg')",
        text: 'After leaving the merchant you continue walking it takes many hours before you stumble upon a crossroads. You feel yourself becoming tired from all of the walking and you know you need to find someplace to rest. To the left you see a town off in the distance, to the right there is a large Castle at the top of a steep hill and located just by the crossroads is an old rundown stables. Where will you go?',
        options: [
            {
                text: 'Explore the Castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town.',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in.',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You finally reach the top of the hill. Once inside the Castle you quickly find a place to sleep. However unbeknownst to you the Castle contains a terrible monster you are killed in your sleep and your journey has ended.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'You reach the town and find a inn, however it costs gold to stay the night what will you do?',
        options: [
          {
            text: 'Sneak inside the inn',
            nextText: 12
          },
          {
            text: 'Pay the fee and stay the night',
            requiredState: (currentState) => currentState.gold,
            setState: { gold: false, silver: true },
            nextText: 13
          }
        ]
      },
      {
        id: 6,
        text: 'The hay inside the stables provided an oddly comfortable place for you to sleep. You look to the Castle at the top of the hill and decide it might be worth exploring, but there is also that nearby town. Where should you go?',
        options: [
          {
            text: 'Explore the castle',
            nextText: 7
          },
          {
            text: 'Explore the town',
            nextText: 14
          }
        ]
      },
      {
        id: 7,
        text: 'You reach the top of the hill and enter the courtyard of the Castle. You think to yourself that the Castle must have some hidden treasures left inside so you decide to explore further. While exploring the castle you come across a horrible monster in your path.',
        options: [
          {
            text: 'Try to run',
            nextText: 8
          },
          {
            text: 'Attack it with your sword',
            requiredState: (currentState) => currentState.sword,
            nextText: 9
          },
          {
            text: 'Hide behind your shield',
            requiredState: (currentState) => currentState.shield,
            nextText: 10
          },
          {
            text: 'Throw the blue goo at it',
            requiredState: (currentState) => currentState.blueGoo,
            nextText: 11
          }
        ]
      },
      {
        id: 8,
        text: 'You attempt to run away from the Monster but he is much faster than you anticipated. You try to escape down a narrow corridor but it is a dead end. The monster catches you. You scream in pain and watch on with horror as he devours your arms and legs like there chicken wings. Your journey has ended.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 9,
        text: 'You unsheathe your sword and charge at the monster. As you attempt your first swing he grabs you and throws you against the walls breaking your bones, leaving you helpless and paralysed. You watch on in horror as he menacingly walks towards you and quickly devours you. Your journey has ended.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 10,
        text: 'As the monster charges you take protecting behind your shield however it is no use the monster flings you and the shield across the room like a play toy. Upon hitting the wall you realise that your legs are broken and you are unable to move. You watch on in horror as he menacingly walks towards you and quickly devours you. Your journey has ended.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 11,
        text: 'You threw your jar of goo at the monster to your astonishment the goo begins to dissolve the monster like an acid. After the dust settled you see that the monster has been destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
          {
            text: 'Congratulations, You Win! Play Again?',
            nextText: -1
          }
        ]
      },
      {
        id: 12,
        text: 'You sneak inside the inn but the innkeeper finds you during the night and alerts the town guard. You are brought to court and hanged for theft. Your journey has ended.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 13,
        text: 'You awake the next morning feeling fully refreshed, you spent all your gold on the room for the night but you still have some silver left over. You leave the inn and think to yourself you should explore the town but you also remember the castle that you saw the day before. What will you do?',
        options: [
          {
            text: 'Explore the castle',
            nextText: 7
          },
          {
            text: 'Explore the town',
            nextText: 14
          }
        ]
      },
      {
        id: 14,
        text: "You arrive at a fountain located in the center of the town. The town for the most part is very well kept besides the old drunk rambling to himself by the fountain. The town is filled with various stalls, guilds and craftmasters. There is so much to choose from that you don't know where to start. ",
        options: [
          {
            text: 'Browse about the stalls',
            nextText: 15
          },
          {
            text: 'Explore the guild halls',
            nextText: 16
          },
          {
            text: 'Browse the wares of the Craftmasters',
            nextText: 17
          },
          {
            text: 'Talk to the old guy laying down by the fountain',
            nextText: 18
          },
        ]
      },
      {
        id: 15,
        text: "You look around the stalls and browse the various goods but find nothing of interest.",
        options: [
          {
            text: 'Go back to the fountain',
            nextText: 14
          }
        ]
      },
      {
        id: 16,
        text: "You venture into the hall of guilds you find many guilds but dominant three appear to be the sword guild, the shield guild and the archers guild. Which guild will you visit?",
        options: [
          {
            text: 'The Sword Guild',
            nextText: 17
          },
          {
            text: 'The Shield Guild',
            nextText: 18
          },
          {
            text: 'The Archers Guild',
            nextText: 19
          },
        ]
      },
      

]

startGame()