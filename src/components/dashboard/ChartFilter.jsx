import React from 'react';
import CustomSelect from '../ui/CustomSelect';

const ChartFilter = ({ timeframe, setTimeframe }) => {

    // Available timeframe options for the chart (label for UI, value for logic)
    const timeframeOptions = [
        { label: 'Last 30 days', value: 30 },
        { label: 'Last 60 days', value: 60 },
        { label: 'Last 90 days', value: 90 },
    ];

    // Handle selection change
    // CustomSelect returns a synthetic event-like object, so we extract value from e.target
    const handleChange = (e) => {
        setTimeframe(Number(e.target.value)); // ensure value is stored as a number
    };

    return (
        <div className="w-34 z-10">
            <CustomSelect
                name="chartTimeframe"   // form field name
                label=""                // no visible label
                value={timeframe}      // currently selected timeframe
                onChange={handleChange} // update handler
                options={timeframeOptions} // dropdown options
            />
        </div>
    );
};

export default ChartFilter;