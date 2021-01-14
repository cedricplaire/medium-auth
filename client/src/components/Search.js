import React from 'react';
import { InputGroup, Form, FormControl, Button } from "react-bootstrap";

const Search = ({
  value,
  onChange,
  onSubmit,
  children
}) =>
  <Form onSubmit={onSubmit}>
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Type your research"
        aria-label="Type your research"
        aria-describedby="basic-addon2"
        value={value}
        onChange={onChange}
      />
      <InputGroup.Append>
        <Button type="submit" variant="outline-primary">{children}</Button>
      </InputGroup.Append>
  </InputGroup>
  </Form>

export default Search;
