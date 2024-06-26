import { CleanNewSpreadsheets } from '@api/ServerActions/CleanNewSpreadsheets';


type SubmitNewDataButtonProps = {
    matchedHeaders: Record<string, string>;
    totalRecords: Record<string, any>[];
    dateFormat: string;
    fileInfo: Record<string, string>;
};

export function SubmitNewDataButton({ matchedHeaders, totalRecords, dateFormat, fileInfo }: SubmitNewDataButtonProps) {
    function handleClick() {
        CleanNewSpreadsheets(matchedHeaders, totalRecords, dateFormat);
        console.log('submitting new data')
    }

    return (
        <button
         className='bg-blue-400 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded-md justify-self-center self-center col-span-9 '
         onClick={handleClick}>Submit New Data
         </button>
    );
}