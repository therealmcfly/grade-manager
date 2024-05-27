import { ChangeEvent, FormEvent, useState } from "react";

export default function Overlay() {
	const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
	
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

		try {
			event.preventDefault();
			/// Replace problematic characters with a space
			const sanitizedInput = inputValue.replace(/[\n\r\t\b\f]/g, ' ');

			// Parse the sanitized JSON string
			const data = JSON.parse(sanitizedInput);

			// Transform the data to the desired format
			const transformedData = data.map((item: { name: string; grade: string }) => {
				localStorage.setItem(item.name, item.grade)
				return ({
				name: item.name,
				grade: parseFloat(item.grade),
				});
			});

			
		} 
		catch (err) {
			console.log(err)
		}

  };


	return(
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-300 p-8 rounded shadow-lg text-black text-xs">
			<form onSubmit={handleSubmit}>
          <textarea
            className="p-1"
            onChange={handleInputChange}
            value={inputValue}
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
	);
}