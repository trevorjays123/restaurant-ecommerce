import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<(data: unknown) => void>> = new Map();

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinOrderTracking(orderId: string): void {
    this.socket?.emit('join-order-tracking', orderId);
  }

  leaveOrderTracking(orderId: string): void {
    this.socket?.emit('leave-order-tracking', orderId);
  }

  onOrderUpdate(callback: (data: { orderId: string; status: string }) => void): () => void {
    this.socket?.on('order-update', callback);
    
    return () => {
      this.socket?.off('order-update', callback);
    };
  }

  onRiderLocationUpdate(callback: (data: { orderId: string; lat: number; lng: number }) => void): () => void {
    this.socket?.on('rider-location-update', callback);
    
    return () => {
      this.socket?.off('rider-location-update', callback);
    };
  }

  onOrderStatusChange(callback: (data: { orderId: string; status: string; message?: string }) => void): () => void {
    this.socket?.on('order-status-change', callback);
    
    return () => {
      this.socket?.off('order-status-change', callback);
    };
  }

  // Get current connection status
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = new SocketService();
export default socketService;
