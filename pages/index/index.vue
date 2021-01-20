<template>
	<view class="add_form">
		<button type="default" @click="getData">gggg</button>
		<view class="tab">
			<view ref="pageContainer" :class="['tab_item',activeIndex===index?'active_css':'']" v-for="(item,index) in tabList"
			 :key='item.id' @click="active(index)">
				{{item.text}}
			</view>
			<view ref="lines" class="line" :style="commStyle"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [{
						id: 1,
						text: "首页"
					},
					{
						id: 2,
						text: "统计"
					},
					{
						id: 3,
						text: "我的"
					},
				],
				activeIndex: 0,
				activeWidth: 0,
				arr: { in: [1, 2, 3],
					out: [4, 5, 6]
				}
			}
		},
		onLoad() {

		},
		methods: {
			getData() {
				for(let j in this.arr){
					this.arr[j].forEach(item=>{
						console.log(item)
					})
				}
			},
			active(index) {
				this.activeIndex = index
				this.activeWidth = this.$refs.pageContainer[index].$el.clientWidth
			}
		},
		computed: {
			commStyle() {
				var comStyle = {
					left: this.activeIndex * this.activeWidth * 2 + 'rpx',
					transition: "all .3s ease-in"
				}
				return comStyle
			}
		}
	}
</script>

<style>
	.tab {
		display: flex;
		width: 750rpx;
		margin: 20rpx 0;
		position: relative;
	}

	.tab_item {
		text-align: center;
		flex: 1;

	}

	.line {
		height: 4rpx;
		background-color: red;
		position: absolute;
		bottom: 0rpx;
		left: 0px;
		width: 250rpx;
	}
</style>
