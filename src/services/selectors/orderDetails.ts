import {RootState} from "../store";

export const getError = (state: RootState) => state.orderDetails.error;
export const isFailed = (state: RootState) => state.orderDetails.failed;
export const getStatus = (state: RootState) => state.orderDetails.status;
export const isSuccess = (state: RootState) => state.orderDetails.success;
export const isRequested = (state: RootState) => state.orderDetails.requested;
export const getOrderNumber = (state: RootState) => state.orderDetails.order?.order.number;
