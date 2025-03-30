  private serializeBigInt(obj: any): any {
    if (typeof obj === 'bigint') {
      return Number(obj);
    }
    if (typeof obj === 'number') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.serializeBigInt(item));
    }
    if (obj !== null && typeof obj === 'object') {
      const result: any = {};
      for (const key in obj) {
        if (key === 'peer_id') {
          result[key] = obj[key];
        } else if (key === 'channel_id') {
          result[key] = obj[key];
        } else if (typeof obj[key] === 'bigint') {
          result[key] = Number(obj[key]);
        } else if (typeof obj[key] === 'number') {
          result[key] = obj[key];
        } else {
          result[key] = this.serializeBigInt(obj[key]);
        }
      }
      return result;
    }
    return obj;
  } 