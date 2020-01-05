<template lang="pug">
  div
    .historyInfo(:class="{openHistory: openHistory}")
      .historyInfo_inner
        .close(@click="openHistory =! openHistory")
        .historyInfo_inner_userID Player : xxxxxx-xxxxx
        .historyInfo_inner_title 您的下注紀錄
        .cards(v-for="items in history")
          .card.small(v-for="item in items")
            .face.back
            .face.front(:class="{red: symbolRed(item.label)}") {{ getSymbol(item.label) }} 
              .top 
                .top_num {{ item.num }}
                .top_suit {{ getSymbol(item.label) }}
              .bottom
                .bottom_num {{ item.num }}
                .bottom_suit {{ getSymbol(item.label) }}
    .gameMain
      .gameInfos
        .gameInfos_group
          .gameInfos_group_amount {{ status }}
          .gameInfos_group_time 剩餘時間 : {{ minute }} : {{ (second).toString().length === 1 ? '0' + second : second }}
        .gameInfo_shffleButton
          span(@click="shuffle") 洗牌
        .historyButton(@click="openHistory =! openHistory") 歷史紀錄
      .cards(v-for="cardBox in cardBoxes")
        .card(v-for="(card,index) in cardBox" :class="{close: index === 0 || index === 4}" :data-order="card.id")
          .face.back
          .face.front(:class="{red: symbolRed(card.label)}") {{ getSymbol(card.label) }}
            .top 
              .top_num {{ card.num }}
              .top_suit {{ getSymbol(card.label) }}
            .bottom
              .bottom_num {{ card.num }}
              .bottom_suit {{ getSymbol(card.label) }}
        .betButton(@click="pushHistory(cardBox)") 押注

</template>

<script>
export default {
  data() {
    return {
      status: `總獎金來到 : ${Math.random() - 0.5 > 0 ? 10 : 5} ETH`,
      minute: 3,
      time: 180,
      second: 0,
      openHistory: false,
      pokerNum: ['8','9','10','J','Q','K','A'],
      cardBoxes: Array.from({length: 4}, () => []),
      history: [],
      symbols: [
        {
          label: "spades",
          symbol: "♠",
          isRed: false
        },
        {
          label: "hearts",
          symbol: "♥",
          isRed: true
        },
        {
          label: "diamonds",
          symbol: "♦",
          isRed: true
        },
        {
          label: "clubs",
          symbol: "♣",
          isRed: true
        },
      ],
      cards: [
        {
          num: '8',
          label: 'spades',
        },
        {
          num: '9',
          label: 'spades',
        },
        {
          num: '10',
          label: 'spades',
        },
        {
          num: 'J',
          label: 'spades',
        },
        {
          num: 'Q',
          label: 'spades',
        },
        {
          num: 'K',
          label: 'spades',
        },
        {
          num: 'A',
          label: 'spades',
        },
        {
          num: '8',
          label: 'hearts',
        },
        {
          num: '9',
          label: 'hearts',
        },
        {
          num: '10',
          label: 'hearts',
        },
        {
          num: 'J',
          label: 'hearts',
        },
        {
          num: 'Q',
          label: 'hearts',
        },
        {
          num: 'K',
          label: 'hearts',
        },
        {
          num: 'A',
          label: 'hearts',
        },
        {
          num: '8',
          label: 'diamonds',
        },
        {
          num: '9',
          label: 'diamonds',
        },
        {
          num: '10',
          label: 'diamonds',
        },
        {
          num: 'J',
          label: 'diamonds',
        },
        {
          num: 'Q',
          label: 'diamonds',
        },
        {
          num: 'K',
          label: 'diamonds',
        },
        {
          num: 'A',
          label: 'diamonds',
        },
        {
          num: '8',
          label: 'clubs',
        },
        {
          num: '9',
          label: 'clubs',
        },
        {
          num: '10',
          label: 'clubs',
        },
        {
          num: 'J',
          label: 'clubs',
        },
        {
          num: 'Q',
          label: 'clubs',
        },
        {
          num: 'K',
          label: 'clubs',
        },
        {
          num: 'A',
          label: 'clubs',
        }
      ]
    }
  },
  computed: {},
  methods: {
    symbolRed(label) {
      return label === 'hearts' || label === 'diamonds' ? true : false
    },
    pushHistory(cardBox) {
      this.history.push(cardBox)
    },
    getSymbol(label) {
      let result = this.symbols.find(s => s.label == label)
      return result ? result.symbol : label
    },
    getTime() {
      this.time = this.time - 1;
      this.minute = Math.floor(this.time / 60) % 60 || 0;
      let delta = this.time;
      this.second = delta % 60 || 0;
    },
    randomCards() {
      this.cards.sort(() => {
        let num = Math.random() > 0.5 ? -1 : 1;
        return num
      })
    },
    assignCard() {
    for (let i = 0; i < this.cards.length; i++) {
      switch (i % 6) {
        case 0:
          this.cardBoxes[0].push(this.cards[i]);
          break
        case 1:
          this.cardBoxes[1].push(this.cards[i]);
          break
        case 2:
          this.cardBoxes[2].push(this.cards[i]);
          break
        case 3:
          this.cardBoxes[3].push(this.cards[i]);
          break
      }
    }
  },
  shuffle() {
    this.cardBoxes = Array.from({length: 4}, () => []);
    this.assignCard();
    this.randomCards();
    },
  },
  created() {
    this.assignCard();
    this.randomCards();
    window.setInterval(this.getTime, 1000)
  }
}
</script>