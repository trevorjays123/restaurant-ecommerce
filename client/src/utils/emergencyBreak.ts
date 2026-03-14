// Emergency break utility to prevent complete site freeze
class EmergencyBreak {
    private static instance: EmergencyBreak;
    private clickCount = 0;
    private lastClickTime = 0;
    private isEngaged = false;
    
    static getInstance() {
        if (!EmergencyBreak.instance) {
            EmergencyBreak.instance = new EmergencyBreak();
        }
        return EmergencyBreak.instance;
    }
    
    check() {
        const now = Date.now();
        
        // Reset counter if more than 1 second passed
        if (now - this.lastClickTime > 1000) {
            this.clickCount = 0;
        }
        
        this.clickCount++;
        this.lastClickTime = now;
        
        // If more than 50 clicks in 1 second, something is wrong
        if (this.clickCount > 50) {
            console.warn('Emergency break triggered - too many clicks!');
            this.engage();
            return true;
        }
        
        return false;
    }
    
    private engage() {
        if (this.isEngaged) return;
        this.isEngaged = true;
        
        // Create emergency overlay
        const overlay = document.createElement('div');
        overlay.id = 'emergency-break';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial, sans-serif;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center; max-width: 400px; padding: 20px;">
                <h2 style="color: #ff6b6b; margin-bottom: 20px;">Site Temporarily Unresponsive</h2>
                <p style="margin-bottom: 30px;">Please reload the page.</p>
                <button onclick="location.reload()" style="
                    background: #E64A19;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                ">Reload Site</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    
    reset() {
        this.clickCount = 0;
        this.isEngaged = false;
        const overlay = document.getElementById('emergency-break');
        if (overlay) overlay.remove();
    }
}

export const emergencyBreak = EmergencyBreak.getInstance();
