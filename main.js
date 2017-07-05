// Some basic components using Bulma and Vue

Vue.component('message', {

	props: ['title', 'body'],
	
	data() {
		return {
			isVisible: true
		}
	},

	template: `
		<article class="message" v-show="isVisible">
      <div class="message-header">
        <p>{{ title }}</p>
        <button class="delete" @click="isVisible=false"></button>
      </div>
      <div class="message-body">
				{{ body }}
      </div>
    </article>
	`
})

Vue.component('modal', {
	props: ['message'],
	template: `

    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <slot></slot>
        </div>
      </div>
      <button class="modal-close is-large" @click="$emit('close')"></button>
    </div>
	`
})

Vue.component('tabs', {
  template: `
    <div>
      <div class="tabs">
        <ul>
          <li v-for="tab in tabs" :class="{ 'is-active' : tab.isActive }">
            <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
          </li>
        </ul>
      </div>
      <div class="tabs-details">
        <slot></slot>
      </div>
    </div>
  `,
  data() {
    return { tabs:[] }
  },
  created() {
    this.tabs = this.$children
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name)
      })
    }
  }
})

Vue.component('tab', {
  props: {
    name: { required: true },
    selected: { default: false }
  },
  template: `
    <div v-show="isActive">
      <slot></slot>
    </div>
  `,
  data() {
    return {
      isActive : false
    }
  },
  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  },
  mounted() {
    this.isActive = this.selected
  }
})

new Vue({
	el: '#root',
  data: {
    showModal: false
  }
})