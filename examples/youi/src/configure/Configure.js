/* eslint react/jsx-key: off */
import React from 'react';
import Switch from '@material-ui/core/Switch';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import {
    Create,
    FormTab,
    SaveButton,
    AutocompleteInput,
    TabbedForm,
    Toolbar,
    required,
} from 'react-admin';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    Table: {
        minWidth: '100%',
    },
    TableRow: {
        height: '25px',
    },
};

function handleChange(event) {
    //setName(event.target.value);
}

const UserEditToolbar = ({ permissions, ...props }) => (
    <Toolbar {...props}>
        <SaveButton label="SAVE" redirect="show" submitOnEnter={true} />
        {permissions === 'admin' && (
            <SaveButton
                label="SAVE"
                redirect={false}
                submitOnEnter={false}
                variant="flat"
            />
        )}
    </Toolbar>
);

const UserCreate = ({ permissions, ...props }) => (
    <Create {...props} title={'Configure'}>
        <TabbedForm toolbar={<UserEditToolbar permissions={permissions} />}>
            <FormTab label="user.form.app" path="">
                <Table>
                    <TableBody>
                        <TableRow height="50">
                            <TableCell>
                                <InputLabel>Application name</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Input
                                    id="application-name"
                                    onChange={handleChange}
                                    autoFocus
                                    validate={required()}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </FormTab>
            <FormTab label="user.form.config" path="">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <InputLabel>Enable analytics</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Switch />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <InputLabel>Dynamic updates</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Switch />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <InputLabel>Dynamic update URL</InputLabel>
                            </TableCell>
                            <TableCell>
                                <Input
                                    id="dynamic-update-url"
                                    onChange={handleChange}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </FormTab>
            {permissions === 'admin' && (
                <FormTab label="user.form.security" path="security">
                    <AutocompleteInput
                        source="role"
                        choices={[
                            { id: '', name: 'None' },
                            { id: 'admin', name: 'Admin' },
                            { id: 'user', name: 'User' },
                            { id: 'user_simple', name: 'UserSimple' },
                        ]}
                    />
                </FormTab>
            )}
        </TabbedForm>
    </Create>
);

const enhance = compose(withStyles(styles));

export default enhance(UserCreate);
