export const isSaveable = (query) =>{
  for (const input of query)
    if ((input as HTMLInputElement).value === '') return false;

  return true;
}
