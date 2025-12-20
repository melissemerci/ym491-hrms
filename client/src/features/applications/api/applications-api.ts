import { api } from '@/lib/api';
import axios from 'axios';
import type {
  UploadAndCheckResponse,
  AnalyzedCVResponse,
  AdditionalFields,
  CreateApplicationRequest,
  JobApplication,
} from '../types';

const IO_SERVICE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

export const applicationsApi = {
  /**
   * Upload CV and check coverage rate
   */
  uploadAndCheckCoverage: async (file: File): Promise<UploadAndCheckResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    // Use axios directly for multipart/form-data
    const response = await axios.post<UploadAndCheckResponse>(
      `${IO_SERVICE_URL}/api/io/cv-application/upload-and-check`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 360000, // 2 minute timeout for CV processing
      }
    );

    return response.data;
  },

  /**
   * Analyze CV with optional additional fields
   */
  analyzeCV: async (
    fileUrl: string,
    additionalFields?: AdditionalFields
  ): Promise<AnalyzedCVResponse> => {
    const formData = new FormData();
    formData.append('file_url', fileUrl);
    
    if (additionalFields) {
      formData.append('additional_fields', JSON.stringify(additionalFields));
    }
    formData.append('save_to_db', 'true');

    const response = await axios.post<AnalyzedCVResponse>(
      `${IO_SERVICE_URL}/api/io/cv-application/analyze`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 360000,
      }
    );

    return response.data;
  },

  /**
   * Create job application
   */
  createApplication: async (
    application: CreateApplicationRequest
  ): Promise<JobApplication> => {
    const response = await api.post<JobApplication>(
      '/api/base/recruitment/applications',
      application
    );
    return response as unknown as JobApplication;
  },
};

