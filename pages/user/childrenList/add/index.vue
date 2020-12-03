<template>
	<!--pages/user/child/add/index.wxml-->
	<view class="add_form">
		<view class="form_item">
			<view style="margin-right:30rpx;"><text style="color:red;margin-right:10rpx;">*</text>姓名</view>
			<input type="text" name="name" placeholder="请输入姓名" />
		</view>
		<view class="form_item">
			<view style="margin-right:30rpx;"><text style="color:red;margin-right:10rpx;">*</text>学号</view>
			<input type="text" name="id" placeholder="请输入学号" />
		</view>
		<view class="form_button">
			<view @click="formSubmit" class="btn-normal">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			formSubmit() {
				uni.navigateTo({
					url: '../user/index'
				})
			}
		}
	}
</script>

<style>
	.form_item {
		display: flex;
		padding: 20rpx;
		border-bottom: 1rpx solid #e8e8e8;
		background-color: white;
	}

	.form_button {
		margin-top: 20rpx;
	}

	.btn-normal {
		display: block;
		margin: 0;
		padding: 0;
		line-height: normal;
		background: none;
		border-radius: 0;
		box-shadow: none;
		border: none;
		font-size: unset;
		text-align: unset;
		overflow: visible;
		color: inherit;
	}

	.form_button view {
		height: 88rpx;
		line-height: 88rpx;
		background: linear-gradient(86deg, rgba(77, 211, 188, 1) 0%, rgba(107, 171, 250, 1) 100%);
		color: #fff;
		font-size: 30rpx;
		border-radius: 999rpx;
		text-align: center;
		width: 630rpx;
		margin: 20rpx auto;
	}
</style>
