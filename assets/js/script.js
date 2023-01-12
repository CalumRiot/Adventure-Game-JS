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
        background: "url('assets/images/starting-cabin.jpg')",
        text: 'You wake up in a strange cabin, you look around and see nobody else is around how did you get here you cannot remember. On a table in the corner of the cabin there is a strange liquid substance inside of a jar what will you do with it?',
        options: [
            {
                text: 'Take the jar of liquid',
                setState: { strangeLiquid: true},
                nextText: 2
            },
            {
                text: 'Leave the jar of liquid',
                setState: { oldManArrested: true },
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        background: "url('assets/images/spooky-forest.jpg')",
        text: 'You venture forth in search of answers. Upon leaving the cabin you follow a small dirt trail through a spooky looking forest you continue walking as fast as your legs will carry you. Once out of the forest you come across a small tent with an oddly looking merchant inside. "Tell me weary traveller have you any goods to trade?"',
        options: [
            {
                text: 'Trade the jar for a sword',
                requiredState: (currentState) => currentState.strangeLiquid,
                setState: { strangeLiquid: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the jar for a shield',
                requiredState: (currentState) => currentState.strangeLiquid,
                setState: { strangeLiquid: false, shield: true },
                nextText: 3
            },
            {
                text: 'Sell the jar of liquid',
                requiredState: (currentState) => currentState.strangeLiquid,
                setState: { strangeLiquid: false, gold: true },
                nextText: 3
            },
            {
              text: 'Ignore the merchant',
              setState: { noMoney: true },
              nextText: 3
            }
        ]
    },
    {
        id: 3,
        background: "url('assets/images/dirt-path.jpg')",
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
        background: "url('assets/images/medieval-castle.jpg')",
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
        background: "url('assets/images/medieval-town.jpg')",
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
        background: "url('assets/images/dirt-path.jpg')",
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
        background: "url('assets/images/medieval-castle.jpg')",
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
            text: 'Throw the jar of liquid at it',
            requiredState: (currentState) => currentState.strangeLiquid,
            nextText: 11
          }
        ]
      },
      {
        id: 8,
        background: "url('assets/images/medieval-castle.jpg')",
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
        background: "url('assets/images/medieval-castle.jpg')",
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
        background: "url('assets/images/medieval-castle.jpg')",
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
        background: "url('assets/images/medieval-castle.jpg')",
        text: 'You threw the jar at the monster to your astonishment the liquid begins to dissolve the monster like an acid. With no more monster and nobody around to claim the castle you take it for yourself. You soon learn the King of the land had placed a bounty on this monster and you are rewarded with endless riches for your success. You spend the remainder of your days like royality in your newly claimed castle.',
        options: [
          {
            text: 'Congratulations, You Win! Play Again?',
            nextText: -1
          }
        ]
      },
      {
        id: 12,
        background: "url('assets/images/medieval-town.jpg')",
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
        background: "url('assets/images/medieval-town.jpg')",
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
        background: "url('assets/images/medieval-town.jpg')",
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
            requiredState: (currentState) => currentState.oldManArrested,
            nextText: 18
          },
          {
            text: 'Beg for Money',
            requiredState: (currentState) => currentState.noMoney,
            nextText: 28
          },
        ]
      },
      {
        id: 15,
        background: "url('assets/images/medieval-town.jpg')",
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
        background: "url('assets/images/guild-hall.jpg')",
        text: "You venture into the hall of guilds you find many guilds but dominant three appear to be the sword guild, the shield guild and the archers guild. Which guild will you join?",
        options: [
          {
            text: 'The Sword Guild',
            nextText: 19
          },
          {
            text: 'The Shield Guild',
            nextText: 20
          },
          {
            text: 'The Archers Guild',
            nextText: 21
          },
          {
            text: "Leave the Guild's Hall",
            nextText: 14
          },
        ]
      },
      {
        id: 19,
        background: "url('assets/images/guild-hall.jpg')",
        text: "You enter the sword guild it is booming with people a member of the sword guild walks up to you and asks if you have a sword as it is required for signup and entrance.",
        options: [
          {
            text: 'Signup to the Sword Guild',
            requiredState: (currentState) => currentState.sword,
            setState: { swordGuild: true },
            nextText: 22
          },
          {
            text: "Leave",
            nextText: 16
          },
          
        ]
      },
      {
        id: 20,
        background: "url('assets/images/guild-hall.jpg')",
        text: "You enter the shield guild it is booming with people a member of the shield guild walks up to you and asks if you have a shield as it is required for signup and entrance.",
        options: [
          {
            text: 'Signup to the Shield Guild',
            requiredState: (currentState) => currentState.shield,
            setState: { shieldGuild: true },
            nextText: 23
          },
          {
            text: "Leave",
            nextText: 16
          },
          
        ]
      },
      {
        id: 21,
        background: "url('assets/images/guild-hall.jpg')",
        text: "You enter the archers guild it is booming with people a member of the archer guild walks up to you and asks if you have a bow as it is required for signup and entrance.",
        options: [
          {
            text: 'Signup to the Archers Guild',
            requiredState: (currentState) => currentState.bow,
            setState: { bowGuild: true },
            nextText: 24
          },
          {
            text: "Leave",
            nextText: 16
          },
          
        ]
      },
      {
        id: 18,
        background: "url('assets/images/medieval-town.jpg')",
        text: 'You decide to strike up a conversation with the old man but he just barks about some monster "THE MONSTER HE LURKS NO MAN CAN STOP HIM ONLY A DEMON CAN KILL HIM BUT HE DIED LONG AGO NOW ONLY THE MONSTER REMAINS!"',
        options: [
          {
            text: 'Tell me more about this monster!',
            nextText: 25
          },
          {
            text: "What a silly old man",
            nextText: 14
          },
          
        ]
      },
      {
        id: 25,
        background: "url('assets/images/medieval-town.jpg')",
        text: "Before I can get an answer the town guards come and take the poor old man away but as he's being dragged away he rambles about some potion he made to destroy the monster. Could he be talking about the jar of liquid from the cabin?",
        options: [
          {
            text: 'Well that was certainly interesting...',
            requiredState: (currentState) => currentState.oldManArrested,
            setState: { oldManArrested: false },
            nextText: 14
          },
          
        ]
      },
      {
        id: 15,
        background: "url('assets/images/medieval-town.jpg')",
        text: "You look around the stalls and browse the various goods but find nothing of interest.",
        options: [
          {
            text: 'Go back to the fountain',
            nextText: 14
          }
        ]
      },
      {
        id: 17,
        background: "url('assets/images/craft-masters.jpg')",
        text: 'You venture over to craftmasters where you find them hard at work building weapons for the various guilds you speak with one of the craftmasters and ask if he could show you his wares. He replies "Swords & Bows 2 Silver each! Shields are Gold coin a piece a lot of metal to make a shield you know." You nod in response.',
        options: [
          {
            text: 'Buy a Sword',
            requiredState: (currentState) => currentState.silver || currentState.gold,
            setState: { sword: true, silver: false},
            nextText: 14
          },
          {
            text: 'Buy a Shield',
            requiredState: (currentState) => currentState.gold,
            setState: { shield: true, gold: false},
            nextText: 14
          },
          {
            text: 'Buy a Bow',
            requiredState: (currentState) => currentState.silver || currentState.gold,
            setState: { bow: true, silver: false},
            nextText: 14
          },
          {
            text: 'Buy Nothing',
            nextText: 14
          },
        ]
      },
      {
        id: 22,
        background: "url('assets/images/quest-board.jpg')",
        text: 'You have successfully joined the sword guild and have been thought the secrets of sword combat. You decide to browse the guild halls quest board and are told by a member of the archers guild about a nearby castle that is home to a terrible monster. The local king has set a bounty on his head and whoever kills him has been promised all the riches in the world. Will you accept the quest too defeat the monster?',
        options: [
          {
            text: 'Yeah bring it on!',
            nextText: 27
          },
          {
            text: "No that sounds too scary for me",
            nextText: 26
          },
          
        ]
      },
      {
        id: 23,
        background: "url('assets/images/quest-board.jpg')",
        text: 'You have successfully joined the shield guild and have been thought the secrets of shield combat. You decide to browse the guild halls quest board and are told by a member of the archers guild about a nearby castle that is home to a terrible monster. The local king has set a bounty on his head and whoever kills him has been promised all the riches in the world. Will you accept the quest too defeat the monster?',
        options: [
          {
            text: 'Yeah bring it on!',
            nextText: 27
          },
          {
            text: "No that sounds too scary for me",
            nextText: 26
          },
          
        ]
      },
      {
        id: 24,
        background: "url('assets/images/quest-board.jpg')",
        text: 'You have successfully joined the archers guild and have been thought the secrets of bow combat. You decide to browse the guild halls quest board and are told by a member of the archers guild about a nearby castle that is home to a terrible monster. The local king has set a bounty on his head and whoever kills him has been promised all the riches in the world. Will you accept the quest too defeat the monster?',
        options: [
          {
            text: 'Yeah bring it on!',
            nextText: 27
          },
          {
            text: "No that sounds too scary for me",
            nextText: 26
          },
          
        ]
      },
      {
        id: 26,
        background: "url('assets/images/medieval-town.jpg')",
        text: "After joining your chosen guild you decide not to take the dreaded monster quest. You spend the remainder of your days as a guild member taking part in easier quests to earn a living for yourself.",
        options: [
          {
            text: 'Congratulations, You Win or Did You? Play Again?',
            nextText: -1
          }
        ]
      },
      {
        id: 28,
        background: "url('assets/images/medieval-town.jpg')",
        text: "After realising you have no money you decide to sit with the old drunk man by the fountain and beg for some silver. You sit there for many hours before a young adventurer takes pity on you and throws you a few silver coins.",
        options: [
          {
            text: 'Finally! Now what can I do with these silver coins?',
            setState: { noMoney: false, silver: true},
            nextText: 14
          }
        ]
      },
      {
        id: 27,
        background: "url('assets/images/dirt-path.jpg')",
        text: "You have decided to take on the dreaded monster lurking inside of the castle. You set out in search of glory and riches.",
        options: [
          {
            text: 'The Kings bounty shall be mine!',
            nextText: 29
          }
        ]
      },
      {
        id: 29,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You arrive at the castle and enter it's courtyard the monster appears from the entrance to the throne room. The monster stands 10ft tall and looks down at you with a hungry look in his eye.",
        options: [
          {
            text: 'By the tip of my sword I shall defeat you!',
            requiredState: (currentState) => currentState.swordGuild,
            nextText: 30
          },
          {
            text: 'My shield is my strength you will be defeated!',
            requiredState: (currentState) => currentState.shieldGuild,
            nextText: 31
          },
          {
            text: 'No monster can escape the the speed of my arrows!',
            requiredState: (currentState) => currentState.bowGuild,
            nextText: 32
          },
          
        
        ]
      },
      {
        id: 30,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You charge at the monster with your sword in hand he swings at you with his claws but you dodge his attack. You make contact with his flesh dealing a hefty blow.",
        options: [
          {
            text: 'The beast is surely done for press the attack!',
            nextText: 33
          },
          {
            text: 'Hold my ground and await the beasts counterattack',
            nextText: 34
          },
        ]
      },
      {
        id: 33,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You charge at the monster once more dealing a 2nd blow, but as you stand back you realise his claws have teared through your flesh. You fall to the ground in a pool of blood as the monster approaches to finish you off. This is the end.",
        options: [
          {
            text: 'Restart',
            nextText: -1
          },
          
        ]
      },
      {
        id: 34,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "The monster charges at you as he approaches you strike him with your sword dealing a mortal blow but not before you are also hit by his claws. You fall the ground, you have slain the monster and saved the kingdom but you where unable to save yourself.",
        options: [
          {
            text: 'Congratulations, You Win....or did you? Play Again?',
            nextText: -1
          },
          
        ]
      },
      {
        id: 31,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You grip your shield and brace yourself for the monsters attack. The monster charges at you and attempts to deal a fatal wound but you hold your ground.",
        options: [
          {
            text: 'Time to attack and finish this monster once and for all.',
            nextText: 35
          },
          {
            text: 'I will continue to hold my ground for my shield shall protect me.',
            nextText: 36
          },
          
        ]
      },
      {
        id: 36,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You hold your ground the Monster attacks again and again and again and again and again. The Monster stands utterly exhausted his attacks have done nothing to you. The Monster falls to the floor from his exhaustion allowing you to deal a final blow. You have defeated the monster and saved the kingdom.",
        options: [
          {
            text: 'Congratulations, You Win! Play Again?',
            nextText: -1
          },
          
        ]
      },
      {
        id: 35,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You charge at the monster attempting to use your shield as a weapon. But as you swing your shield back to hit the monster you expose yourself to his attacks and the monster slashes you with his claws. You fall to the ground in a pool of blood as the monster approaches to finish you off. This is the end.",
        options: [
          {
            text: 'Restart',
            nextText: -1
          },
          
        ]
      },
      {
        id: 32,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You prepare an arrow from your quiver and begin firing at the monster. The monster attacks but you keep a safe distance choosing to shoot from afar. The monster is bleeding and heavily wounded but he is unrelenting and continues to attack you. You reach for another arrow but your quiver is empty. What will you do?",
        options: [
          {
            text: 'Attempt to pull out an arrow from the monster',
            nextText: 37
          },
          {
            text: 'Search around for any fallen or used arrows',
            nextText: 38
          },
          
        ]
      },
      {
        id: 37,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You charge at the monster avoiding his claws allowing you to pull an arrow from his leg. But he catches you with his claws as you attempt to further the distance. He slashes through your flesh you are bleeding heavily but as he holds you up you stick your last arrow in his skull. The monster falls to the ground defeated. You attempt to stand but you are mortally wounded, you have slain the monster and saved the kingdom but you where unable to save yourself.",
        options: [
          {
            text: 'Congratulations, You Win....or did you? Play Again?',
            nextText: -1
          },
          
        ]
      },
      {
        id: 38,
        background: "url('assets/images/medieval-castle.jpg')",
        text: "You search around attempting to find an spare arrow but its no use all your arrows lay broken or stuck in the monster. You can only look on helplessly as you are eventually cornered by the monster. He slashes through your flesh, you fall to the ground in a pool of blood as the monster approaches to finish you off. This is the end.",
        options: [
          {
            text: 'Restart',
            nextText: -1
          },
          
        ]
      },

      

      
]

startGame()