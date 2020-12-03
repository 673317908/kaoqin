<template>
	<view>
		<view class="none_data">
			<view class="iconfont icon-zanwushuju" style="font-size:310rpx"></view>
			<view>暂无数据</view>
		</view>
		<view class="add_child" @click="addChild">
			<text>添加孩子</text>
		</view>
	</view>
</template>

<script>
	export default {
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
	.none_data {
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -40%);
		text-align: center;
		color: #999999;
	}

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
