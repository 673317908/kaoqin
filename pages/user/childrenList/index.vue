<template>
	<view>
		<NoneData />
		<view class="add_child" @click="addChild">
			<text>添加孩子</text>
		</view>
	</view>
</template>

<script>
	import NoneData from "../../../components/none_data.vue"
	export default {
		components: {
			NoneData
		},
		data() {
			return {}
		},
		methods: {
			addChild() {
				uni.navigateTo({
					url: './add/index'
				})
			}
		}
	}
</script>

<style>
	.add_child {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 750rpx;
		box-sizing: border-box;
		text-align: center;
		color: white;
		font-size: 30rpx;
		background: linear-gradient(86deg, rgba(77, 211, 188, 1) 0%, rgba(107, 171, 250, 1) 100%);
		padding: 30rpx 0;
	}
</style>
