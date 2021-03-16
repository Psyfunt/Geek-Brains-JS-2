
export const Error = {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setCurrentError(text){
            this.text = text;
        }
    },
    template: `
            <div class="error-wrapper" v-show="text">
                <img src="img/action_icon.png" @click="setCurrentError('')" class="del-btn"  alt="action">
                <p class="error">{{text}}</p>
            </div>\`
    `
}