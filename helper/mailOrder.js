export const payOrderEmailTemplate = (order) => {
  return `<h1>Cảm ơn bạn đã ủng hộ cửa hàng chúng tôi</h1>
  <p>
  Xin chào ${order.user.name},</p>
  <p>Chúng tôi đã đóng gói hàng của bạn.</p>
  <h2>[Đơn hàng ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Sản phẩm</strong></td>
  <td><strong>Số lượng</strong></td>
  <td><strong align="right">Giá</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
      .map(
        (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> ${item.price.toFixed(0)}đ</td>
    </tr>
  `
      )
      .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Giá sản phẩm:</td>
  <td align="right"> ${order.itemsPrice.toFixed(0)}đ</td>
  </tr>
  <tr>
  <td colspan="2">Giá vận chuyển:</td>
  <td align="right"> ${order.shippingPrice.toFixed(0)}đ</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Tổng:</strong></td>
  <td align="right"><strong> ${order.totalPrice.toFixed(0)}đ</strong></td>
  </tr>
  <tr>
  <td colspan="2">Phương thức thanh toán:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Địa chỉ giao hàng</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.district},<br/>
  ${order.shippingAddress.ward},<br/>
  ${order.shippingAddress.address},<br/>
  </p>
  <hr/>
  <p>
  Cảm ơn bạn rất nhiều.
  </p>
  `;
};


export const deliverOrderEmailTemplate = (order) => {
  return `<h1>Cảm ơn bạn đã ủng hộ cửa hàng chúng tôi</h1>
  <p>
  Xin chào ${order.user.name},</p>
  
  <h2>[Đơn hàng ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <p>Đơn hàng đã được vận chuyển.</p>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.district},<br/>
  ${order.shippingAddress.ward},<br/>
  ${order.shippingAddress.address},<br/>
  </p>
  <hr/>
  <p>
  Cảm ơn bạn rất nhiều.
  </p>
  `;
};