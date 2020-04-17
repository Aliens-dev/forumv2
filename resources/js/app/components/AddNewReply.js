import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import '../assets/styles/EditorStyle.scss';

const AddNewReply = (props) => {
    const handleEditorChange = (content)=> {
        props.handleChange(content);
    }
    return (
        <Editor
         init={{
           height: 300,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={handleEditorChange}
       />
    )
}

export default AddNewReply;