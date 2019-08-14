/* eslint react/jsx-key: off */
import React from 'react';
import {
    Create,
    FormTab,
    SaveButton,
    AutocompleteInput,
    TabbedForm,
    Toolbar,
    required,
} from 'react-admin';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const UserEditToolbar = ({ permissions, ...props }) => (
    <Toolbar {...props}>
        <SaveButton
            label="user.action.save"
            redirect="show"
            submitOnEnter={true}
        />
    </Toolbar>
);

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    Table: {
        minWidth: '100%',
    },
    TableRow: {
        height: '36px',
    },
    Input: {
        width: '100%',
    },
};

const UserCreate = withStyles(styles)(({ classes, permissions, ...props }) => (
    <Create {...props}>
        <TabbedForm toolbar={<UserEditToolbar permissions={permissions} />}>
            <FormTab label="user.form.summary" path="">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <InputLabel>First Name</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Input
                                    width="100%"
                                    id="fname"
                                    onChange={handleChange}
                                    autoFocus
                                    validate={required()}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <InputLabel>Last Name</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Input
                                    id="lname"
                                    onChange={handleChange}
                                    autoFocus
                                    validate={required()}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <InputLabel>Email Address</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Input
                                    id="email"
                                    onChange={handleChange}
                                    autoFocus
                                    validate={required()}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <InputLabel>Password</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Input
                                    htmlFor="component-password"
                                    id="password"
                                    onChange={handleChange}
                                    autoFocus
                                    validate={required()}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <InputLabel>Role</InputLabel>
                            </TableCell>
                            <TableCell>
                                <AutocompleteInput
                                    source=""
                                    choices={[
                                        { id: '', name: 'None' },
                                        { id: 'admin', name: 'Admin' },
                                        { id: 'user', name: 'User' },
                                        {
                                            id: 'user_simple',
                                            name: 'UserSimple',
                                        },
                                    ]}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </FormTab>
        </TabbedForm>
    </Create>
));

function handleChange(event) {
    //setName(event.target.value);
}

export default UserCreate;
