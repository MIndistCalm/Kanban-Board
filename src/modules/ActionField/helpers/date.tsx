export function getDate() {
	const today = new Date()
	return { today }
}

export function formatDate(value: number) {
  const current = new Date(value)

	const dd = String(current.getDate()).padStart(2, '0')
	const mm = String(current.getMonth() + 1).padStart(2, '0') //January is 0!
	const yyyy = current.getFullYear()

	return mm + '/' + dd + '/' + yyyy
}
