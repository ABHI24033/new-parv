'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createTestimonial, getAllTestimonials } from '@/lib/actions/testimonials';

export default function TestimonialDialog() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', message: '', date: '', avatar: undefined });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const res = await getAllTestimonials();

            if (res.success) {
                setTestimonials(res.testimonials);
            } else {
                setError(res.message);
            }
        };

        fetchTestimonials();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar') {
            setForm({ ...form, avatar: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        const formData = {
            name: form?.name,
            message: form?.message,
            date: form?.date,
            avatar: form?.avatar,
        };

        const res = await createTestimonial(formData);

        setLoading(false);

        if (res.success) {
            setForm({ name: '', message: '', date: '', avatar: undefined });
            setOpen(false);
            // optionally: update local testimonial list
        } else {
            setError(res.message);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className='w-full flex justify-end'>
                        <Button className="mb-4 mr-4">Add Testimonial</Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add a Testimonial</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                        <Textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
                        <Input type="date" name="date" value={form.date} onChange={handleChange} />
                        <Input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit} disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Testimonials Table using ShadCN */}
            {
                testimonials?.length > 0 ?
                <div className="mt-6 p-6">
                      <div className='pb-4 font-bold text-lg'>Testimonial Data</div>
                    <Table className={"border p-2"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials?.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell>
                                        {t.avatar ? (
                                            <Image
                                                src={t?.avatar || "/user.png"}
                                                alt={t.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <img
                                                src={ "/user.png"}
                                                alt={t?.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{t.name}</TableCell>
                                    <TableCell>{t.message}</TableCell>
                                    <TableCell>{t.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                    :
                    <div>
                        No testimonials found
                    </div>
            }

        </div>
    );
}
