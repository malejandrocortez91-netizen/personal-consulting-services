'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { MessageCircle, Send, X, LoaderCircle } from 'lucide-react';
import { handleChatbotSubmission } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant' | 'status';
  content: string;
};

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} aria-label="Send message">
      {pending ? <LoaderCircle className="animate-spin" /> : <Send />}
    </Button>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  const formAction = async (prevState: any, formData: FormData) => {
    const userEmail = formData.get('email') as string;
    const userMessage = formData.get('message') as string;

    if (userEmail && userMessage) {
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    }
    
    const result = await handleChatbotSubmission(prevState, formData);

    if (result?.data) {
      setMessages((prev) => [...prev, { role: 'assistant', content: result.data.response }]);
    }

    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    }

    return result;
  };
  
  const [state, dispatch] = useFormState(formAction, initialState);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={toggleOpen}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
          <Card className="flex h-[60vh] flex-col shadow-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-primary">Need Assistance?</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className={cn('flex items-end gap-2')}>
                  <div className={cn('max-w-xs rounded-lg bg-muted p-3')}>
                    <p className="text-sm">
                      Hello! If you'd like to get in touch or request a resume, please leave your email and a message below.
                    </p>
                  </div>
                </div>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn('flex items-end gap-2', {
                      'justify-end': msg.role === 'user',
                      'justify-start': msg.role === 'assistant',
                    })}
                  >
                    <div
                      className={cn('max-w-xs rounded-lg p-3', {
                        'bg-primary text-primary-foreground': msg.role === 'user',
                        'bg-muted': msg.role === 'assistant',
                      })}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-2">
              <form action={dispatch} className="flex w-full flex-col gap-2">
                <div className="flex w-full items-center gap-2">
                  <Input name="email" type="email" placeholder="Your Email" required className="flex-1" />
                </div>
                <div className="flex w-full items-center gap-2">
                  <Textarea
                    name="message"
                    placeholder="Your message..."
                    required
                    className="min-h-0 flex-1 resize-none"
                    rows={1}
                  />
                  <SubmitButton />
                </div>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
