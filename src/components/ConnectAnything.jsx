import React from 'react';
import './ConnectAnything.css';

const ConnectAnything = () => {
    // Handle proximity hover effect
    const handleMouseEnter = (row, col) => {
        // Get all surrounding positions (including the hovered one)
        const positions = [];
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 1 && r <= 5 && c >= 1 && c <= 9) {
                    positions.push(`r${r}c${c}`);
                }
            }
        }
        
        // Add glow effect to all surrounding items
        positions.forEach(pos => {
            const item = document.querySelector(`[data-position="${pos}"]`);
            if (item) {
                item.classList.add('proximity-glow');
            }
        });
    };

    const handleMouseLeave = () => {
        // Remove glow effect from all items
        const allItems = document.querySelectorAll('.connect-grid-item');
        allItems.forEach(item => {
            item.classList.remove('proximity-glow');
        });
    };

    // Generate grid items for 5 rows and 9 columns
    const generateGridItems = () => {
        const items = [];
        for (let row = 1; row <= 5; row++) {
            for (let col = 1; col <= 9; col++) {
                const svgPath = `/r${row}c${col}.svg`;
                const key = `r${row}c${col}`;
                
                items.push(
                    <div 
                        key={key} 
                        className="connect-grid-item"
                        data-position={key}
                        onMouseEnter={() => handleMouseEnter(row, col)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img 
                            src={svgPath} 
                            alt={`Integration ${key}`}
                            className="connect-icon"
                            loading="lazy"
                        />
                    </div>
                );
            }
        }
        return items;
    };

    return (
        <div className="connect-anything-container">
            <svg className="connect-top-svg" xmlns="http://www.w3.org/2000/svg" width="927" height="26" viewBox="0 0 927 26" fill="none">
                <path d="M927 0H0L46 26H881L927 0Z" fill="#000"/>
            </svg>
            <svg className="connect-bottom-svg" xmlns="http://www.w3.org/2000/svg" width="927" height="26" viewBox="0 0 927 26" fill="none">
                <path d="M927 26H0L46 0H881L927 26Z" fill="#000"/>
            </svg>
            
            <div className="connect-anything-inner">
                <h2 className="connect-anything-title">Connect anything</h2>
                <div className="connect-anything-divider"></div>
                <div className="connect-anything-grid">
                    {generateGridItems()}
                </div>
            </div>
        </div>
    );
};

export default ConnectAnything;
