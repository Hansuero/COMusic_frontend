<template>
    <el-dialog
    v-model="is_visible"
    title="注意"
    width="30%"
    @close="handle_close"
    >
        <span>
            <p class="Chinese_font" style="color: black">{{ instruction }}</p>
        </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button id="left" @click="handle_left">
                    <p class="Chinese_font" style="color: black;">{{ left_choice }}</p>
                </el-button>
                <el-button id="right" color="#32CD32" @click="handle_right">
                    <p class="Chinese_font">{{ right_choice }}</p>
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { getCurrentInstance } from 'vue';
import { ref,watchEffect } from 'vue';
var is_visible = ref(false)
var delta = ref(1)

export default {
    name: 'Dialog',

    setup(props) {
        delta.value = 1
        watchEffect(() => {
            console.log(delta.value)
            if(delta.value==0){
                return
            }
            else{
                is_visible.value = props.can_visible;
                console.log('----------------');
                console.log(is_visible.value);
                console.log('----------------');
            }
        })
        const handle_close = () => {
            this.$emit('close')
        }
        return { is_visible }
    },
    props: [
        'can_visible', //对话框是否可见
        'instruction', //对话框主体内容
        'left_choice', //对话框左下角的文字，一般表示使用者已读但是不想按照提示办事 
        'right_choice', //对话框右小角的文字，一般表示使用者愿意按照你的指示办事
        'right_function' //当使用者愿意配合办事的时候，用来处理事件的函数
    ],
    methods: {
        handle_left(){
            console.log("wwwwwwwwww")
            delta.value = 0
            is_visible.value = false
        },
        handle_right(){
            delta.value = 0
            is_visible.value = false
            this.$props.right_function()
        },
        update_delta(){
            delta.value = 1
        }
    },
}
</script>

<style scoped>
.Chinese_font {
	color: white;
	font-size: large;
	font-family:'Microsoft YaHei', sans-serif;;
}
</style>