# This class handles a local group storage.  It is designed to be forwards and
# backwards compatible with groups created using the Solstice perl framework.

import authz_group.models

class SolsticeCrowdImplementation():
    @staticmethod
    def get_groups_for_user(login_name):
        sol_crowds = authz_group.models.SolsticeCrowd.objects.filter(solsticecrowdowner__person__login_name = login_name)

        return sol_crowds

    @staticmethod
    def get_css_source_type():
        return 'Solstice--Model--GroupSource--Crowd'

    @staticmethod
    def get_source_type():
        return 'Solstice::Model::GroupSource::Crowd'

    @staticmethod
    def json_data_structure():
        return {
            'source_type': SolsticeCrowdImplementation.get_source_type(),
            'css_source_type': SolsticeCrowdImplementation.get_css_source_type(),
            'display_name': 'Your groups',
        }
