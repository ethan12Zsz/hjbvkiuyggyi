const Discord = require('discord.js')
const db = require('quick.db')

//db.fetch(`money_${message.guild.id}_${message.author.id}`)
module.exports = {
    name: "blackjack",
    aliases: ["bj"],
    cooldown: 2000,
    ownerOnly: false,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],
    async execute(client, message, args, data) {

        let user = message.author;
        let money = parseInt(args[1]);
        let moneydb = await db.get(`money_${message.guild.id}_${user.id}`)
          let a = message.author;
    
    
          if (args[0] === 'all' || args[0] === 'max') {
              money = moneydb;
          } else {
              money = parseInt(args[0]);
          }
    
          if (!money || money < 1 || money > moneydb) {
              message.lineReply("Spécifier un montant")
              return
          }
    
          if (!moneydb) {
              message.lineReply("Vous n'avez pas d'argent")
              return
          }
    
          message.lineReply(message.translate.admin.whitelist.list.loading).then(async m => {
          var numCardsPulled = 0;
          var gameOver = false;
    
          var player = {
              cards: [],
              score: 0
          };
          var dealer = {
              cards: [],
              score: 0
          };

          function getCardsValue(a) {
              var cardArray = [],
                  sum = 0,
                  i = 0,
                  dk = 10.5,
                  doubleking = "QQ",
                  aceCount = 0;
              cardArray = a;
              for (i; i < cardArray.length; i += 1) {
                  if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
                      sum += 10;
                  } else if (cardArray[i].rank === "A") {
                      sum += 11;
                      aceCount += 1;
                  } else if (cardArray[i].rank === doubleking) {
                      sum += dk
                  } else {
                      sum += cardArray[i].rank;
                  }
              }
              while (aceCount > 0 && sum > 21) {
                  sum -= 10;
                  aceCount -= 1;
              }
              return sum;
          }
    
          var deck = {
              deckArray: [],
              initialize: function() {
                  var suitArray, rankArray, s, r, n;
                  suitArray = ["clubs", "diamants", "coeurs", "épées"];
                                    rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
                  n = 13;
                  for (s = 0; s < suitArray.length; s += 1) {
                      for (r = 0; r < rankArray.length; r += 1) {
                          this.deckArray[s * n + r] = {
                              rank: rankArray[r],
                              suit: suitArray[s]
                          };
                      }
                  }
              },
              shuffle: function() {
                  var temp, i, rnd;
                  for (i = 0; i < this.deckArray.length; i += 1) {
                      rnd = Math.floor(Math.random() * this.deckArray.length);
                      temp = this.deckArray[i];
                      this.deckArray[i] = this.deckArray[rnd];
                      this.deckArray[rnd] = temp;
                  }
              }
          };
    
          deck.initialize();
          deck.shuffle();
    
          async function bet(outcome) {
            if (outcome === "win") {
              db.add(`money_${message.guild.id}_${user.id}`, money)
            }
            if (outcome === "lose") {
              db.subtract(`money_${message.guild.id}_${user.id}`, money)
            }
        }
    
          function resetGame() {
              numCardsPulled = 0;
              player.cards = [];
              dealer.cards = [];
              player.score = 0;
              dealer.score = 0;
              deck.initialize();
          }
    
          function endMsg(title, msg, dealerC) {
              let cardsMsg = "";
              player.cards.forEach(function(card) {
                  cardsMsg += "[`" + card.rank.toString();
                  if (card.suit == "coeurs") cardsMsg += "♥"
                  if (card.suit == "diamants") cardsMsg += "♦"
                  if (card.suit == "épées") cardsMsg += "♠"
                  if (card.suit == "clubs") cardsMsg += "♣"
                  cardsMsg += "`](https://example.com) "
              });
    
              let dealerMsg = "";
              if (!dealerC) {
                  dealerMsg = "[`" + dealer.cards[0].rank.toString();
                  if (dealer.cards[0].suit == "coeurs") dealerMsg += "♥"
                  if (dealer.cards[0].suit == "diamants") dealerMsg += "♦"
                  if (dealer.cards[0].suit == "épées") dealerMsg += "♠"
                  if (dealer.cards[0].suit == "clubes") dealerMsg += "♣"
                  dealerMsg += " ? ?`](https://wassim.bot/)"
              } else {
                  dealer.cards.forEach(function(card) {
                      dealerMsg += "[`" + card.rank.toString();
                      if (card.suit == "coeurs") dealerMsg += "♥"
                      if (card.suit == "diamants") dealerMsg += "♦"
                      if (card.suit == "épées") dealerMsg += "♠"
                      if (card.suit == "clubes") dealerMsg += "♣"
                      dealerMsg += "`](https://wassim.bot/) "
                  });
              }
    
              const gambleEmbed = new Discord.MessageEmbed()
                  .setColor(data.color)
                  .addField("Votre partie de BlackJack commence",msg)
                  .addField('Votre main : '+player.score.toString(), cardsMsg, true)
                    .addField('Le croupier : '+dealer.score.toString(), dealerMsg, true)
                   .setFooter(client.user.username)
                   .setTimestamp()
           m.edit("",gambleEmbed)
           
          }
    
          async function endGame() {
              if (player.score === 21) {
                  bet('win');
                  gameOver = true;
                  await endMsg("Votre partie de BlackJack est finis", `BLACKJACK !! Vous gagner \`${money}\` :coin:`, true)
              }
              if (player.score > 21) {
                  bet('lose');
                  gameOver = true;
                  await endMsg("Votre partie de BlackJack est finis", `Vous avez perdu`, true)
                             }
              if (dealer.score === 21) {
                  bet('lose');
                  gameOver = true;
                  await endMsg("Votre partie de BlackJack est finis", `Vous avez perdu`, true)
                    }
              if (dealer.score > 21) {
                  bet('win');
                  gameOver = true;
                  await endMsg("Votre partie de BlackJack est finis", `Vous avez gagné \`${money}\` :coin:`, true)
                              }
              if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
                  bet('win');
                  gameOver = true;
                  await endMsg("Votre partie de BlackJack est finis", `Vous avez gagné \`${money}\` :coin:`, true)
                            }              if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
                  bet('lose');
                  gameOver = true;
                  await endMsg("Votre partie de BlackJack est finis", `Vous avez perdu`, true)
                     }
              if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
                  gameOver = true;
                  await endMsg("Votre partie de BlackJack est finis", `Vous avez perdu`, true)
              }
          }
    
          function dealerDraw() {
    
              dealer.cards.push(deck.deckArray[numCardsPulled]);
              dealer.score = getCardsValue(dealer.cards);
              numCardsPulled += 1;
          }
    
          function newGame() {
              hit();
              hit();
              dealerDraw();
              endGame();
          }
    
          function hit() {
              player.cards.push(deck.deckArray[numCardsPulled]);
              player.score = getCardsValue(player.cards);
    
              numCardsPulled += 1;
              if (numCardsPulled > 2) {
                  endGame();
              }
          }
    
          function stand() {
              while (dealer.score < 17) {
                  dealerDraw();
              }
              endGame();
          }
    
          newGame();
          async function loop() {
              if (gameOver) return;
    
              await endMsg("Votre partie de BlackJack commence", 'Tapez ``c`` pour piocher, et ``p`` pour rester ! ', false)

              let filter = m => m.author.id === message.author.id;
              message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 1200000,
                  errors: ['time']
              }).then(cld => {
                cld = cld.first()
                  if (cld.content === "c") {
                      hit();
                      loop();
                      cld.delete()
                      return
                  } else if (cld.content === "p") {
                      stand();
                      loop();
                      cld.delete()
                      return
                  } else {
                    cld.delete()
                      bet("perder");
                      return
                  }
              }).catch(_ => {
                message.lineReply("Vous avez perdu tout votre argent")
                                 bet("lose");
                  return
              })
          }
    
          await loop()
        })
        
          
    }
}
