export const getError = (state) => state.orderDetails.error;
export const isFailed = (state) => state.orderDetails.failed;
export const getStatus = (state) => state.orderDetails.status;
export const isSuccess = (state) => state.orderDetails.success;
export const isRequested = (state) => state.orderDetails.requested;
export const getOrderNumber = (state) => state.orderDetails.order?.order.number;
