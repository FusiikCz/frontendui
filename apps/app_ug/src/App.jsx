import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

import { AppCanvas } from '@hrbolek/uoisfrontend-gql-shared'
import { AppRouter } from './AppRouter';

export const App = () => {
    return (
        <AppCanvas>
            <Navbar className='bg-light mb-3'>
                <Container>
                    <Navbar.Brand href="/" className="justify-content-start">
                        <a href='/' className='btn'>UOIS</a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/admission-test">Admission Test</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <AppRouter />
        </AppCanvas>    
    )
}

