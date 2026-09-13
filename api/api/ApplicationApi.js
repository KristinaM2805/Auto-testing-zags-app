export class ApplicationApi {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://regoffice.senla.eu';
  }

  async sendUserRequest(data) {
    return await this.request.post(`${this.baseUrl}/sendUserRequest`, { data });
  }

  async getApplStatus(applicationId) {
    return await this.request.get(`${this.baseUrl}/getApplStatus/${applicationId}`);
  }

  async getApplications() {
    return await this.request.get(`${this.baseUrl}/getApplications`);
  }

  async getApplicationsWithMethod(method) {
    return await this.request.fetch(`${this.baseUrl}/getApplications`, { method });
  }

  async sendAdminRequest(data) {
    return await this.request.post(`${this.baseUrl}/sendAdminRequest`, { data });
  }

  async requestProcess(data) {
    return await this.request.post(`${this.baseUrl}/requestProcess`, { data });
  }
}
