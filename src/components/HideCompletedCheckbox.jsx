export function HideCompletedCheckbox({ checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      Ocultar completadas
    </label>
  );
}