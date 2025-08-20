export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validatePassword = (password: string): string[] => {
	const errors: string[] = [];

	if (password.length < 8) {
		errors.push("Password must be at least 8 characters long");
	}

	if (!/(?=.*[a-z])/.test(password)) {
		errors.push("Password must contain at least one lowercase letter");
	}

	if (!/(?=.*[A-Z])/.test(password)) {
		errors.push("Password must contain at least one uppercase letter");
	}

	if (!/(?=.*\d)/.test(password)) {
		errors.push("Password must contain at least one number");
	}

	return errors;
};
