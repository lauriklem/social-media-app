import React, { useState } from "react";
import { Textarea, TextareaWrapper, FormWrapper, SmallButton, PostForm, ButtonContainer } from "components";

export default function AddComment({ cookies, serverUrl, postid, setDoFetch }) {
    const [comment, setComment] = useState('');

    const [sending, setSending] = useState(false);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // Add comment to db
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                },
                body: JSON.stringify({
                    "username": cookies['username'],
                    "content": comment,
                    "ctype": "text"
                }),
            };

            try {
                setSending(true);
                const result = await fetch(serverUrl + `posts/${postid}/comments`, requestOptions);
                const response = await result.json();
                if (response.success) {
                    setDoFetch(2);
                    setComment('');
                }
            } catch (err) {
            } finally {
                setSending(false);
            }
        }
    };

    return (
        <FormWrapper>
            {sending ? <p>Sending comment...</p> :
                <PostForm action='' onSubmit={handleSubmit}>
                    <TextareaWrapper>
                        <Textarea
                            name="newcomment"
                            id="newcomment"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add comment"
                            rows="1"
                        />
                    </TextareaWrapper>
                    <ButtonContainer>
                        <SmallButton type="submit">Send</SmallButton>
                    </ButtonContainer>
                </PostForm>
            }
        </FormWrapper>
    );
}