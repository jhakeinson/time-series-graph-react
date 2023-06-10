import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface IntervalSelectorProps {
    interval: string;
    setInterval: (interval: string) => void;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({ 
    interval,
    setInterval,
}) => {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newInterval: string,
    ) => {
        event.preventDefault();
        setInterval(newInterval);
    };

    return (
        <ToggleButtonGroup
            color="info"
            value={interval}
            exclusive
            onChange={handleChange}
            aria-label="interval selector"
            size='small'
            fullWidth={true}
        >
            <ToggleButton value="monthly">MONTHLY</ToggleButton>
            <ToggleButton value="weekly">WEEKLY</ToggleButton>
            <ToggleButton value="daily">DAILY</ToggleButton>
        </ToggleButtonGroup>
    );
}

export default IntervalSelector;