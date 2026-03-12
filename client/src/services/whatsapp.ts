// WhatsApp Service for Nigerian Restaurant

const WHATSAPP_API_URL = 'https://api.whatsapp.com/v1';

interface WhatsAppMessage {
  to: string;
  type: 'text' | 'template';
  content: {
    body?: string;
    template?: {
      namespace: string;
      language: { code: string };
      components: unknown[];
    };
  };
}

export const whatsappService = {
  // Generate pre-filled WhatsApp message link
  generateChatLink: (phoneNumber: string, message?: string): string => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message || '');
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  },

  // Open WhatsApp in new tab
  openChat: (phoneNumber: string, message?: string): void => {
    const link = whatsappService.generateChatLink(phoneNumber, message);
    window.open(link, '_blank');
  },

  // Pre-order message
  getPreOrderMessage: (orderDetails: {
    items: { name: string; quantity: number; price: number }[];
    total: number;
    name: string;
    address: string;
    phone: string;
  }): string => {
    let message = `🛒 *New Order Request*\n\n`;
    message += `*Customer:* ${orderDetails.name}\n`;
    message += `*Phone:* ${orderDetails.phone}\n`;
    message += `*Address:* ${orderDetails.address}\n\n`;
    message += `*Order Details:*\n`;
    
    orderDetails.items.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - ₦${item.price.toLocaleString()}\n`;
    });
    
    message += `\n*Total: ₦${orderDetails.total.toLocaleString()}*`;
    
    return message;
  },

  // Order confirmation message
  getOrderConfirmationMessage: (orderNumber: string, eta: number): string => {
    return `✅ *Order Confirmed!*\n\nYour order *${orderNumber}* has been received and is being prepared.\n\nEstimated delivery time: *${eta} minutes*\n\nTrack your order in real-time on our website.\n\nThank you for ordering with NaijaKitchen! 🇳🇬`;
  },

  // Delivery notification message
  getDeliveryMessage: (orderNumber: string, riderName: string, riderPhone: string): string => {
    return `🚴 *Your Order is On The Way!*\n\nOrder *${orderNumber}* is being delivered by ${riderName}.\n\nContact: ${riderPhone}\n\nTrack your rider in real-time on our website.`;
  },

  // Abandoned cart recovery
  getAbandonedCartMessage: (customerName: string, items: { name: string; price: number }[], total: number): string => {
    let message = `😔 *You left something behind, ${customerName}!*\n\n`;
    message += `Your cart has been saved:\n\n`;
    
    items.forEach((item) => {
      message += `• ${item.name} - ₦${item.price.toLocaleString()}\n`;
    });
    
    message += `\n*Total: ₦${total.toLocaleString()}*\n\n`;
    message += `Complete your order now and enjoy our delicious food! 🍽️`;
    
    return message;
  },

  // Support message
  getSupportMessage: (orderNumber?: string): string => {
    let message = `📞 *Customer Support*\n\n`;
    message += `Hello! I need help with`;
    
    if (orderNumber) {
      message += ` order *${orderNumber}*`;
    }
    
    message += `.\n\nPlease assist me.`;
    
    return message;
  },
};

export default whatsappService;
