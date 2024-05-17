// Copyright 2021 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package rolebinding

import (
	databaseModel "github.com/perses/perses/internal/api/database/model"
	"github.com/perses/perses/internal/api/interface/v1/rolebinding"
	"github.com/perses/perses/pkg/model/api"
	v1 "github.com/perses/perses/pkg/model/api/v1"
)

type dao struct {
	rolebinding.DAO
	client databaseModel.DAO
	kind   v1.Kind
}

func NewDAO(persesDAO databaseModel.DAO) rolebinding.DAO {
	return &dao{
		client: persesDAO,
		kind:   v1.KindRoleBinding,
	}
}

func (d *dao) Create(entity *v1.RoleBinding) error {
	return d.client.Create(entity)
}

func (d *dao) Update(entity *v1.RoleBinding) error {
	return d.client.Upsert(entity)
}

func (d *dao) Delete(project string, name string) error {
	return d.client.Delete(d.kind, v1.NewProjectMetadata(project, name))
}

func (d *dao) DeleteAll(project string) error {
	return d.client.DeleteByQuery(&rolebinding.Query{Project: project})
}

func (d *dao) Get(project string, name string) (*v1.RoleBinding, error) {
	entity := &v1.RoleBinding{}
	return entity, d.client.Get(d.kind, v1.NewProjectMetadata(project, name), entity)
}

func (d *dao) List(q *rolebinding.Query) ([]*v1.RoleBinding, error) {
	var result []*v1.RoleBinding
	err := d.client.Query(q, &result)
	return result, err
}

func (d *dao) RawList(q *rolebinding.Query) ([][]byte, error) {
	return d.client.RawQuery(q)
}

func (d *dao) MetadataList(q *rolebinding.Query) ([]api.Entity, error) {
	var list []*v1.PartialProjectEntity
	err := d.client.Query(q, &list)
	result := make([]api.Entity, 0, len(list))
	for _, el := range list {
		result = append(result, el)
	}
	return result, err
}

func (d *dao) RawMetadataList(q *rolebinding.Query) ([][]byte, error) {
	return d.client.RawMetadataQuery(q, d.kind)
}
