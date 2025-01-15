export const getAuth0Id = (sub) => {
    if (!sub.includes('|')) return sub; 
    return sub.split('|')[1]; 
  };