import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary_range: string;
  deadline: string;
}

const PostJob = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<JobFormData>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: JobFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase
        .from('jobs')
        .insert([{ ...data, status: 'active' }]);

      if (supabaseError) throw supabaseError;

      reset();
      navigate('/jobs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while posting the job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-2 text-gray-600">Fill in the details below to post a new job listing</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Job title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            {...register('company', { required: 'Company name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            {...register('location', { required: 'Location is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Employment Type
          </label>
          <select
            id="type"
            {...register('type', { required: 'Employment type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          >
            <option value="">Select type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description', { required: 'Job description is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <textarea
            id="requirements"
            rows={4}
            {...register('requirements', { required: 'Requirements are required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          />
          {errors.requirements && (
            <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="salary_range" className="block text-sm font-medium text-gray-700">
            Salary Range
          </label>
          <input
            type="text"
            id="salary_range"
            {...register('salary_range')}
            placeholder="e.g., UGX 500,000 - 1,000,000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            id="deadline"
            {...register('deadline', { required: 'Deadline is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A1B3D] focus:ring-[#0A1B3D]"
          />
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0A1B3D] hover:bg-[#162C50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A1B3D] disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;