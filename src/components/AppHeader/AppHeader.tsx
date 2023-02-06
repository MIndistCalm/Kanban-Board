import { Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'

const AppHeader = () => {
  return (
    <Navbar variant='dark' bg='secondary'>
      <Container>
        <Navbar.Brand>Kanban Board</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default AppHeader
