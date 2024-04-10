import { useState, useEffect } from "react"

type UserHeaderCardProps = {
    selectedCsvHeader: string | null,
    setSelectedCsvHeader: Function,
    selectedAcceptableHeader: string | null,
    unmatchedUserHeaders: string[],
    dateFormat?: ''| 'ymd' | 'mdy' | 'dmy',
    setDateFormat: Function,
    totalRecords: Record<string, any>[]
}

export function UserHeaderCard({ selectedCsvHeader, setSelectedCsvHeader, selectedAcceptableHeader, unmatchedUserHeaders, dateFormat, setDateFormat, totalRecords}: UserHeaderCardProps) { 

    const [selectedHeaderData, setSelectedHeaderData] = useState<string[]>([])
    const [dontIncludeHeaders, setDontIncludeHeaders] = useState<string[]>([])

    useEffect(() => {
        if (unmatchedUserHeaders.length && selectedCsvHeader) {
            const newSelectedHeaderData = totalRecords
                .map((record) => record[selectedCsvHeader])
                .filter((value) => value !== null)
                .filter((value, index, self) => self.indexOf(value) === index)
                .slice(0, 6);
            setSelectedHeaderData(newSelectedHeaderData);
        }
    }, [selectedCsvHeader]);

    useEffect(() => {
        if (!unmatchedUserHeaders.length) return;
        if (!selectedCsvHeader) {
            const firstUnmatchedCsvHeader = unmatchedUserHeaders[0];
            if (firstUnmatchedCsvHeader) {
                setSelectedCsvHeader(firstUnmatchedCsvHeader);
            }
        }
    }, [selectedCsvHeader, unmatchedUserHeaders, setSelectedCsvHeader])


    function handleDontInclude(event: React.MouseEvent<HTMLButtonElement>) {
        if (!selectedCsvHeader) return;
        setDontIncludeHeaders([...dontIncludeHeaders, selectedCsvHeader])
        setSelectedCsvHeader(null)
    }
    console.log('selectedCsvHeader', selectedCsvHeader)
    
    function validationButton() {
        switch (selectedAcceptableHeader) {
            case null:
                return
            case "date":
                return (
                    <select
                        onChange={(e) => setDateFormat(e.target.value)}
                        value={dateFormat}
                        required
                        >
                        <option value="" disabled>Select Format</option>
                        <option value="ymd">Year Month Day</option>
                        <option value="mdy">Month Day Year</option>
                        <option value="dmy">Day Month Year</option>
                    </select>
                );
            default:
                return null;
        }
    }
    


    return (
        <div className="col-start-1  grid grid-cols-2 border border-slate-900 m-4">
            <h2 className="col-start-1 col-span-2 underline capitalize ">{selectedCsvHeader}</h2>
            {selectedHeaderData && (
                <>
                    <ul className="col-start-1 row-start-2">
                        {selectedHeaderData.map((headerData, index) => (
                            <li className="truncate" key={`${headerData}-${index}`}>{headerData}</li>
                        ))}
                    </ul>
                    {selectedCsvHeader && validationButton() && ( 
                        <div className="col-start-2 row-start-2 ml-auto">
                            {validationButton()}
                        </div>
                    )}
                    <button className="col-start-2 row-start-3 border border-slate-800"
                    onClick={handleDontInclude}> Don't Include </button>
                </>

            )}
        </div>
    )
}