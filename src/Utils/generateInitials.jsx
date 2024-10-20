const generateInitials = (fullName) => {
    if (!fullName) return ''; // Return empty string if no name is provided

    const nameParts = fullName.split(' ');
    const initials = nameParts.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
};

export default generateInitials;