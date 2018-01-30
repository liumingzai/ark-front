import React from 'react';
import { Input, Form, Button } from 'antd';

const FormItem = Form.Item;

function Search() {
  return (
    <Form layout="inline">
      <FormItem>
        <Input placeholder="Please input UID" />
      </FormItem>
      <FormItem>
        <Button type="primary">Search</Button>
      </FormItem>
    </Form>
  );
}

export default Search;
