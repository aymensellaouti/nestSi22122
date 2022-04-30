import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

export function paginate(
  qb: SelectQueryBuilder<any>,
  page: number,
  nombre: number,
) {
  if (nombre) {
    if (!page) {
      page = 1;
    }
    qb.skip((page - 1) * nombre);
    qb.take(nombre);
  }
}
